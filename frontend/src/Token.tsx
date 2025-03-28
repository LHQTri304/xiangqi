import { Button } from "./components/ui/button";
import { useQuery } from "@tanstack/react-query";
import api from "./AxiosClient";

export default function Token() {
  const { data, isLoading } = useQuery({
    queryKey: ["token"],
    queryFn: async () => {
      const response = await api.get("/health/auth");
      return response.data;
    }
  });

  if (isLoading) {
    return <h1>Is loading</h1>;
  }

  return (
    <>
      <Button>{JSON.stringify(data, undefined, 2)}</Button>
    </>
  );
}
