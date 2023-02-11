import { Stock } from "@/app/page";
import Tag from "@/components/Tag";
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
    `https://ineuron-stock-server.onrender.com/api/v1/data/${id}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  return response.data;
};

const Description = ({ text, variable, index, id }: DescriptionProps) => {
  if (!variable) return <p>{text}</p>;

  const keys = Object.keys(variable);

  return (
    <p>
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

export default async function Details({ params: { id } }: Props) {
  const stock = await getData(id);

  return (
    <main className="flex flex-col justify-center  h-screen">
      <Link href={"/"} className="flex">
        <span className="material-symbols-outlined">arrow_back</span>
        Go Back
      </Link>
      <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
        <h1>{stock.name}</h1>
        <Tag color={stock.color}>{stock.tag}</Tag>

        <hr className="w-full border-[0.1px] border-gray-200 mt-5"></hr>

        {stock.criteria.map((e, i) => (
          <Description
            key={e.text}
            text={e.text}
            id={stock.id.toString()}
            variable={e.variable}
            index={i}
          />
        ))}
      </div>
    </main>
  );
}
