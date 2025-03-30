import { BoardContext, Result, OK_RESULT, crossedRiver } from '.';

export function validPawnMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board }: BoardContext,
): Result {
  const piece = board[fromRow][fromCol];
  if (!piece) {
    return { ok: false, message: 'No piece at the starting position.' };
  }
  const isPieceRed = piece === piece.toUpperCase();
  const direction = isPieceRed ? -1 : 1; // Red moves up, Black moves down
  // Pawn can move forward one step
  if (toRow === fromRow + direction && toCol === fromCol) {
    return OK_RESULT;
  }
  // Pawn can move diagonally one step after crossing the river
  if (crossedRiver([fromRow, fromCol], isPieceRed)) {
    if (
      (toRow === fromRow && toCol === fromCol - 1) ||
      (toRow === fromRow && toCol === fromCol + 1)
    ) {
      return OK_RESULT;
    }
  }
  return { ok: false, message: 'Invalid pawn move.' };
}

export function validRookMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
export function validKingMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
export function validKnightMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
export function validBishopMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
export function validAvisorMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
export function validCannonMoveValidator(
  [fromRow, fromCol]: [number, number],
  [toRow, toCol]: [number, number],
  { board: _ }: BoardContext,
): Result {
  throw new Error('Function not implemented.');
}
