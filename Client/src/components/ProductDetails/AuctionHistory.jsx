import React from "react";
import { Title } from "../common/Design";

const AuctionHistory = ({ history }) => {
  return (
    <>
      <div className="shadow-s1 p-8 rounded-lg">
        <Title level={5} className=" font-normal">
          Auction History
        </Title>
        <hr className="my-5" />

        {history?.length === 0 ? (
          <Title level={5} className="font-normal text-center text-red-500">
            No auction history found.
          </Title>
        ) : (
          <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-5">
                    Bid Placed At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Bid Amount(PKR)
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4"> {item?.user?.name} </td>
                    <td className="px-6 py-4">
                      {new Date(item?.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">Rs: {item?.price}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AuctionHistory;
