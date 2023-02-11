import { Stock } from "@/app/page";
import Link from "next/link";
import Tag from "./Tag";

type Props = {
  stock: Stock;
};

export default function Card({ stock }: Props) {
  return (
    <Link href={`/details/${stock.id}/`} className="block hover:bg-gray-50">
      <div className="shadow sm:rounded-md border-b-0  border border-gray-400 flex items-center px-4 py-4 sm:px-6">
        <p className="truncate font-medium text-indigo-600">{stock.name}</p>

        <div className="ml-auto flex items-center">
          <Tag color={stock.color}>{stock.tag}</Tag>
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      </div>
    </Link>
  );
}
