import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// Piece types
const PIECE_TYPES = {
  RED_GENERAL: "red_general",
  RED_ADVISOR: "red_advisor",
  RED_ELEPHANT: "red_elephant",
  RED_HORSE: "red_horse",
  RED_CHARIOT: "red_chariot",
  RED_CANNON: "red_cannon",
  RED_SOLDIER: "red_soldier",
  BLACK_GENERAL: "black_general",
  BLACK_ADVISOR: "black_advisor",
  BLACK_ELEPHANT: "black_elephant",
  BLACK_HORSE: "black_horse",
  BLACK_CHARIOT: "black_chariot",
  BLACK_CANNON: "black_cannon",
  BLACK_SOLDIER: "black_soldier",
};

// Unicode characters for pieces
const PIECE_UNICODE = {
  [PIECE_TYPES.RED_GENERAL]: "帥",
  [PIECE_TYPES.RED_ADVISOR]: "仕",
  [PIECE_TYPES.RED_ELEPHANT]: "相",
  [PIECE_TYPES.RED_HORSE]: "傌",
  [PIECE_TYPES.RED_CHARIOT]: "俥",
  [PIECE_TYPES.RED_CANNON]: "炮",
  [PIECE_TYPES.RED_SOLDIER]: "兵",
  [PIECE_TYPES.BLACK_GENERAL]: "將",
  [PIECE_TYPES.BLACK_ADVISOR]: "士",
  [PIECE_TYPES.BLACK_ELEPHANT]: "象",
  [PIECE_TYPES.BLACK_HORSE]: "馬",
  [PIECE_TYPES.BLACK_CHARIOT]: "車",
  [PIECE_TYPES.BLACK_CANNON]: "砲",
  [PIECE_TYPES.BLACK_SOLDIER]: "卒",
};

// Initial board setup
const initialSetup = [
  { id: "r-chariot1", type: PIECE_TYPES.RED_CHARIOT, position: [0, 0] },
  { id: "r-horse1", type: PIECE_TYPES.RED_HORSE, position: [1, 0] },
  { id: "r-elephant1", type: PIECE_TYPES.RED_ELEPHANT, position: [2, 0] },
  { id: "r-advisor1", type: PIECE_TYPES.RED_ADVISOR, position: [3, 0] },
  { id: "r-general", type: PIECE_TYPES.RED_GENERAL, position: [4, 0] },
  { id: "r-advisor2", type: PIECE_TYPES.RED_ADVISOR, position: [5, 0] },
  { id: "r-elephant2", type: PIECE_TYPES.RED_ELEPHANT, position: [6, 0] },
  { id: "r-horse2", type: PIECE_TYPES.RED_HORSE, position: [7, 0] },
  { id: "r-chariot2", type: PIECE_TYPES.RED_CHARIOT, position: [8, 0] },
  { id: "r-cannon1", type: PIECE_TYPES.RED_CANNON, position: [1, 2] },
  { id: "r-cannon2", type: PIECE_TYPES.RED_CANNON, position: [7, 2] },
  { id: "r-soldier1", type: PIECE_TYPES.RED_SOLDIER, position: [0, 3] },
  { id: "r-soldier2", type: PIECE_TYPES.RED_SOLDIER, position: [2, 3] },
  { id: "r-soldier3", type: PIECE_TYPES.RED_SOLDIER, position: [4, 3] },
  { id: "r-soldier4", type: PIECE_TYPES.RED_SOLDIER, position: [6, 3] },
  { id: "r-soldier5", type: PIECE_TYPES.RED_SOLDIER, position: [8, 3] },

  { id: "b-chariot1", type: PIECE_TYPES.BLACK_CHARIOT, position: [0, 9] },
  { id: "b-horse1", type: PIECE_TYPES.BLACK_HORSE, position: [1, 9] },
  { id: "b-elephant1", type: PIECE_TYPES.BLACK_ELEPHANT, position: [2, 9] },
  { id: "b-advisor1", type: PIECE_TYPES.BLACK_ADVISOR, position: [3, 9] },
  { id: "b-general", type: PIECE_TYPES.BLACK_GENERAL, position: [4, 9] },
  { id: "b-advisor2", type: PIECE_TYPES.BLACK_ADVISOR, position: [5, 9] },
  { id: "b-elephant2", type: PIECE_TYPES.BLACK_ELEPHANT, position: [6, 9] },
  { id: "b-horse2", type: PIECE_TYPES.BLACK_HORSE, position: [7, 9] },
  { id: "b-chariot2", type: PIECE_TYPES.BLACK_CHARIOT, position: [8, 9] },
  { id: "b-cannon1", type: PIECE_TYPES.BLACK_CANNON, position: [1, 7] },
  { id: "b-cannon2", type: PIECE_TYPES.BLACK_CANNON, position: [7, 7] },
  { id: "b-soldier1", type: PIECE_TYPES.BLACK_SOLDIER, position: [0, 6] },
  { id: "b-soldier2", type: PIECE_TYPES.BLACK_SOLDIER, position: [2, 6] },
  { id: "b-soldier3", type: PIECE_TYPES.BLACK_SOLDIER, position: [4, 6] },
  { id: "b-soldier4", type: PIECE_TYPES.BLACK_SOLDIER, position: [6, 6] },
  { id: "b-soldier5", type: PIECE_TYPES.BLACK_SOLDIER, position: [8, 6] },
];

// Zustand store with Immer middleware
const useXiangqiStore = create(
  immer((set) => ({
    pieces: initialSetup,
    movePiece: (id, toPosition) =>
      set((state) => {
        const pieceIndex = state.pieces.findIndex((piece) => piece.id === id);
        if (pieceIndex === -1) {
          throw new Error("Invalid move");
        }
        state.pieces[pieceIndex].position = toPosition;
      }),
    resetBoard: () => set(() => ({ pieces: initialSetup })),
  })),
);

// Draggable piece component
const XiangqiPiece = ({ id, type, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "piece",
    item: { id, position },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const isRed = type.startsWith("red");

  return (
    <div
      ref={drag}
      className={`w-12 h-12 rounded-full flex items-center justify-center text-3xl cursor-move z-10 ${
        isRed ? "bg-red-600 text-white" : "bg-gray-800 text-white"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {PIECE_UNICODE[type]}
    </div>
  );
};

// Droppable square component
const BoardSquare = ({ x, y, children }) => {
  const movePiece = useXiangqiStore((state) => state.movePiece);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "piece",
    drop: (item) => {
      movePiece(item.id, [x, y]);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-full h-full flex items-center justify-center border border-gray-200 ${
        isOver ? "bg-green-200 bg-opacity-20" : ""
      } ${y >= 4 && y <= 5 ? "bg-blue-100 bg-opacity-20" : ""}`}
    >
      {children}
    </div>
  );
};

// Board component
const Board = () => {
  const pieces = useXiangqiStore((state) => state.pieces);
  const resetBoard = useXiangqiStore((state) => state.resetBoard);

  // Create a 2D grid representation
  const grid = Array(10)
    .fill()
    .map(() => Array(9).fill(null));

  // Place pieces on the grid
  pieces.forEach((piece) => {
    const [x, y] = piece.position;
    grid[y][x] = piece;
  });

  return (
    <div className="flex flex-col items-center">
      <div className="border-2 border-black aspect-[9/10]">
        <div className="grid grid-cols-9 grid-rows-10">
          {grid.map((row, y) =>
            row.map((piece, x) => (
              <BoardSquare key={`${x}-${y}`} x={x} y={y}>
                {piece && (
                  <XiangqiPiece
                    id={piece.id}
                    type={piece.type}
                    position={[x, y]}
                  />
                )}
              </BoardSquare>
            )),
          )}
        </div>
      </div>
      <button
        onClick={resetBoard}
        className="py-2 px-5 mt-4 text-lg text-white bg-blue-500 rounded transition-colors hover:bg-blue-600"
      >
        Reset Board
      </button>
    </div>
  );
};

// Main app component
const XiangqiBoard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 text-center">
        <h1 className="mb-6 text-3xl font-bold">Xiangqi (Chinese Chess)</h1>
        <div className="border-8 border-amber-300">
          <Board />
        </div>
      </div>
    </DndProvider>
  );
};

export default XiangqiBoard;
