import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export type Stock = {
  id: Number;
  name: string;
  tag: string;
  color: string;
  criteria: [
    {
      text: string;
      type: string;
      variable: {
        [key: string]: {
          type: string;
          values: Array<Number>;
        };
      };
    }
  ];
};

async function getData(): Promise<Array<Stock>> {
  const res = await fetch(
    "https://ineuron-stock-server.onrender.com/api/v1/data"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  return response.data;
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="overflow-hidden bg-white flex w-screen h-screen justify-center items-center">
      <ul className="divide-y divide-gray-200 w-3/5 ">
        {(data || []).map((e) => (
          <li key={e?.id?.toString?.()}>
            <Card stock={e} />
          </li>
        ))}
      </ul>
    </main>
  );
}
