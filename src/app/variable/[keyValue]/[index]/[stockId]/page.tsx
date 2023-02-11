import { Stock } from "@/app/page";
import Tag from "@/components/Tag";
import Link from "next/link";

const getData = async (keyValue, index, stockId) => {
  const res = await fetch(
    `https://ineuron-stock-server.onrender.com/api/v1/data/variable/${keyValue.replace(
      "%24",
      "$"
    )}/${index}/${stockId}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const response = await res.json();

  return response.data;
};

const ValuesList = ({ stock }) => {
  return stock.values.sort((a, b) => a - b).map((e) => <p key={e}>{e}</p>);
};

const IndicatorsList = ({ stock }) => {
  return (
    <>
      <h1>{stock.study_type}</h1>
      <p>{stock.parameter_name}</p>
      <p>{stock.default_value}</p>
    </>
  );
};

export default async function Details({
  params: { keyValue, index, stockId },
}) {
  const stock = await getData(keyValue, index, stockId);

  console.log(stock);

  return (
    <main className="flex flex-col justify-center  h-screen">
      <Link href={`/details/${stockId}`} className="flex">
        <span className="material-symbols-outlined">arrow_back</span>
        Go Back
      </Link>
      <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-4 w-4ull">
        {stock.type === "value" ? (
          <ValuesList stock={stock} />
        ) : (
          <IndicatorsList stock={stock} />
        )}
      </div>
    </main>
  );
}
