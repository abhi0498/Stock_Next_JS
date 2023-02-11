import { Stock } from "@/app/page";
import Tag from "@/components/Tag";
import Head from "next/head";
import Link from "next/link";

type DescriptionProps = {
  text: string;
  variable: any;
  index: number;
  id: string;
};

type Props = {
  params: { id: string };
};

const getData = async (id: String): Promise<Stock> => {
  const res = await fetch(
    `https://ineuron-stock-server.onrender.com/api/v1/data/${id}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  return response.data;
};

const Description = ({ text, variable, index, id }: DescriptionProps) => {
  if (!variable) return <p className="font-medium text-gray-900">{text}</p>;

  const keys = Object.keys(variable);

  return (
    <p className="font-medium text-gray-900">
      {text.split(" ").map((e, i) => {
        if (e.startsWith("$")) {
          return (
            <a
              href={`/variable/${e}/${index}/${id}`}
              key={e}
              className="variable-text"
            >
              {variable[e].type === "value"
                ? variable[e].values[0].toString()
                : variable[e].default_value.toString()}{" "}
            </a>
          );
        }
        return e + " ";
      })}
    </p>
  );
};

export default async function Details({ params: { id = "1" } }: Props) {
  const stock = await getData(id);

  return (
    <>
      <main className="flex flex-col justify-center  h-screen">
        <Link href={"/"} className="flex">
          <span className="material-symbols-outlined">arrow_back</span>
          Go Back
        </Link>
        <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
          <h3 className="text-2xl font-medium leading-6 text-gray-900  my-2">
            {stock.name}
          </h3>
          <Tag color={stock.color}>{stock.tag}</Tag>
          <hr className="w-full border-[0.1px] border-gray-200 mt-5"></hr>

          <ul role="list" className="divide-y divide-gray-200">
            {stock.criteria.map((e, i) => (
              <li key={e.text} className="flex py-4">
                <Description
                  text={e.text}
                  id={stock.id.toString()}
                  variable={e.variable}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
