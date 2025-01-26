import { TiEyeOutline } from "react-icons/ti";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useState, useMemo } from "react";

export const Table = ({
  products,
  isWon,
  isAdmin,
  isLoading,
  handleSellProduct,
  handleDeleteProduct,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [soldFilter, setSoldFilter] = useState("all");
  const itemsPerPage = 5; // Number of items per page

  // Logic to handle page change
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Logic to filter products based on selected filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (verifiedFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.isVerify === (verifiedFilter === "verified")
      );
    }

    if (soldFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.isSoldout === (soldFilter === "sold")
      );
    }

    return filtered;
  }, [products, verifiedFilter, soldFilter]);

  // Calculate the items to display based on the current page and items per page
  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredProducts?.slice(
    offset,
    offset + itemsPerPage
  );

  // Calculate the total number of pages
  const pageCount = Math.ceil(filteredProducts?.length / itemsPerPage);
  const URL_IMAGE = import.meta.env.VITE_BACKEND_URL_MAIN;

  return (
    <>
      {/* Filter Section */}
      <div className="flex justify-between mb-4">
        <div className="flex gap-4">
          {/* Verified Dropdown */}
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="all">Verify Status</option>
            <option value="verified">Verified</option>
            <option value="unverified">Unverified</option>
          </select>

          {!isAdmin && (
            <select
              value={soldFilter}
              onChange={(e) => setSoldFilter(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              <option value="all">Sold Status</option>
              <option value="sold">Sold</option>
              <option value="unsold">Unsold</option>
            </select>
          )}
        </div>
      </div>

      <div className="relative overflow-x-auto rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image 
              </th>
              <th scope="col" className="px-6 py-5">
                Title
              </th>
              <th scope="col" className="px-6 py-5">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Commission
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              {!isWon && (
                <>
                  {!isAdmin && (
                    <th scope="col" className="px-6 py-3">
                      Sold
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </>
              )}
              {!isWon && (
                <>
                  {!isAdmin && (
                    <th scope="col" className="px-6 py-3">
                      Auction
                    </th>
                  )}
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((product, index) => (
              <tr key={index} className="bg-white border-b hover:bg-gray-50 ">
                <td className="px-6 py-4">
                  <div className="flex justify-between items-center gap-2">
                    {product?.isVerify ? (
                      <div className="flex items-center">
                        <div className="p-0.5 rounded-full bg-green text-white">
                          <FaCheck />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="p-0.5 rounded-full text-white bg-red-500">
                          <ImCross />
                        </div>
                      </div>
                    )}
                    <img
                      className="w-14 h-14 rounded-md"
                      src={`${product?.image?.filePath}`}
                      alt={product?.title}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">{product?.title?.slice(0, 10)}...</td>
                <td className="px-6 py-4">{product?.category?.slice(0, 10)}</td>
                <td className="px-6 py-4">{product?.commission} %</td>
                <td className="px-6 py-4">Rs. {product?.price} </td>

                {!isAdmin && (
                  <>
                    <td className="px-6 py-4">
                      {product?.isSoldout ? (
                        <button className="bg-red-500 text-white py-1 px-3 rounded-lg">
                          Sold
                        </button>
                      ) : (
                        <button className="p-0.5 rounded-lg bg-green text-white">
                          on sale
                        </button>
                      )}
                    </td>
                  </>
                )}

                <td className="px-6 py-4 text-center flex items-center gap-3 mt-3">
                  {/* view product */}
                  <NavLink
                    to={`/details/${product?._id}`}
                    aria-label="View product"
                    className="font-medium text-indigo-500"
                  >
                    <TiEyeOutline size={25} />
                  </NavLink>

                  {/* update product */}
                  {isAdmin ? (
                    <NavLink
                      to={`/product/admin/update/${product?._id}`}
                      aria-label="Edit product"
                      className="font-medium text-green-500"
                    >
                      <CiEdit size={25} />
                    </NavLink>
                  ) : (
                    <NavLink
                      to={`/product/update/${product?._id}`}
                      aria-label="Edit product"
                      className="font-medium text-green-500"
                    >
                      <CiEdit size={25} />
                    </NavLink>
                  )}

                  {/* delete product */}
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    aria-label="Delete product"
                    className="font-medium text-red-500"
                  >
                    <MdOutlineDeleteOutline size={25} />
                  </button>
                </td>
                <td>
                  {/* sale product to highest user */}
                  {!product?.isSoldout && !isAdmin && (
                    <button
                      onClick={() => handleSellProduct(product._id)}
                      className={`p-1 rounded-md ${
                        product?.isVerify
                          ? "bg-green text-white"
                          : "bg-gray-500 text-white cursor-not-allowed"
                      }`}
                      disabled={!product?.isVerify}
                    >
                      {isLoading ? "Closing" : "Close Auction"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center items-center gap-2"}
          previousClassName={"px-3 py-2 bg-gray-200 rounded"}
          nextClassName={"px-3 py-2 bg-gray-200 rounded"}
          pageClassName={
            "px-3 py-2 cursor-pointer bg-gray-100 hover:bg-gray-300 rounded"
          }
          activeClassName={"bg-green-500 text-white"}
        />
      </div>
    </>
  );
};
