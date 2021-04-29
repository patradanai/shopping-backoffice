import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ allCounter, counter, onChangeCounter, focusCounter }) => {
  // const activePag = () => {
  //   return "w-12 flex justify-center items-center  cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-green-400 text-white";
  // };

  // const inactivePag = () => {
  //   return "w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full";
  // };

  // const counterFunction = (counter: number, allCounter: number) => {
  //   if (!counter) {
  //     counter = 1;
  //   }

  //   if (!allCounter) {
  //     allCounter = 1;
  //   }

  //   const roundCounter = allCounter / counter;
  //   let stockCounter = [];
  //   for (let i = 1; i <= Math.ceil(roundCounter); i++) {
  //     stockCounter.push(
  //       <div
  //         className={focusCounter == i ? activePag() : inactivePag()}
  //         onClick={() => onChangePagination(i)}
  //       >
  //         {i}
  //       </div>
  //     );
  //   }

  //   return stockCounter;
  // };

  const onChangePagination = (number) => {
    onChangeCounter(number.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(allCounter / counter)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        initialPage={focusCounter - 1}
        onPageChange={onChangePagination}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </>
  );
};

export default Pagination;
