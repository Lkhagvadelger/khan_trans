import { API, Method } from "@util/query";
import { useMutation, useQuery } from "react-query";

export const useFetchLoads = () =>
  useQuery("loads", () => API._auth(Method.GET, "/loads"));

export const useNewLoadsCheck = () =>
  useMutation(API._auth(Method.POST, "loads"));
