import React from "react";
import Image from "next/image";

const ListProduct = (props) => {
  return (
    <div className="flex h-full py-1 bg-white border items-center justify-between px-5">
      <div>1</div>
      <div>
        <Image src={"/images/avatar.png"} width={40} height={40} />
      </div>
      <div>Pad Thai Chicken</div>
      <div>1x</div>
      <div>500</div>
    </div>
  );
};

export default ListProduct;
