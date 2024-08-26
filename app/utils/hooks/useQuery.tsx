import { axiosInstance } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";

// Fetchin Person
const fetchPersons = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/persons?size=${size}&current=${page}`
  );
  // console.log(data);
  return data;
};

export const useQueryPersons = (page: number, size: number) => {
  return useQuery({
    queryKey: ["persons", page.toString(), size.toString()],
    queryFn: fetchPersons,
    refetchOnWindowFocus: false,
  });
};

// Fetching Report
const fetchReports = async ({ queryKey }: { queryKey: string[] }) => {
  // const fetchReports = async () => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/reports?size=${size}&current=${page}`
    // `/persons`
  );
  // console.log(data);
  return data.data.reports;
};

export const useQueryReports = (page: number, size: number) => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
    refetchOnWindowFocus: false,
  });
};

// Fetching Requests
const fetchRequests = async ({ queryKey }: { queryKey: string[] }) => {
  const [_, page, size] = queryKey;
  const { data } = await axiosInstance.get(
    `/requests?size=${size}&current=${page}`
  );
  return data;
};

export const useQueryRequests = (page: number, size: number) => {
  return useQuery({
    queryKey: ["requests", page.toString(), size.toString()],
    queryFn: fetchRequests,
    refetchOnWindowFocus: false,
  });
};

// untuk di halaman laporan tab user
export const useQueryReportsLaporan = () => {
  return useQuery({
    queryKey: ["reports"],
    queryFn: fetchReports,
    refetchOnWindowFocus: false,
  });
};
