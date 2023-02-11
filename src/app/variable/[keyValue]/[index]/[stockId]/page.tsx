import { Stock } from "@/app/page";
import Tag from "@/components/Tag";
import Link from "next/link";

const getData = async (keyValue: string, index: string, stockId: string) => {
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

const ValuesList = ({ stock }: { stock: any }) => {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {stock.values
        .sort((a: number, b: number) => a - b)
        .map((e: number) => (
          <li className="flex py-4" key={e}>
            {e}
          </li>
        ))}
    </ul>
  );
};

const IndicatorsList = ({ stock }: { stock: any }) => {
  return (
    <>
      <ul role="list" className="divide-y divide-gray-200">
        <div>
          <h3 className="text-lg font-medium leading-6 my-4 text-gray-900 uppercase">
            {stock.study_type}
          </h3>
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700"
            >
              {stock.parameter_name}
            </label>
            <div className="mt-1.5">
              <input
                data-testid="indicator-input"
                type="tel"
                name="param_value"
                id="param_value"
                max="99"
                min="1"
                className="block w-full rounded-md border-[0.1px] border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2 py-3"
                placeholder="period value"
                value={stock.default_value}
              />
            </div>
          </div>
        </div>
      </ul>
    </>
  );
};

type Props = {
  params: {
    keyValue: string;
    index: string;
    stockId: string;
  };
};

export default async function Details({
  params: { keyValue, index, stockId },
}: Props) {
  const stock = await getData(keyValue, index, stockId);

  return (
    <main className="flex flex-col justify-center  h-screen">
      <Link href={`/details/${stockId}`} className="flex">
        <span className="material-symbols-outlined">arrow_back</span>
        Go Back
      </Link>
      <div className="overflow-hidden bg-white shadow sm:rounded-md md:min-w-[30vw] px-4 py-5 sm:px-6 w-full">
        <h3 className="text-2xl font-medium leading-6 text-gray-900">
          Variable params
        </h3>
        <hr className="w-full border-[0.1px] border-gray-200 mt-5" />
        {stock.type === "value" ? (
          <ValuesList stock={stock} />
        ) : (
          <IndicatorsList stock={stock} />
        )}
      </div>
    </main>
  );
}
