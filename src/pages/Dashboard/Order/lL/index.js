import React from "react";
import Image from "next/image";

const ListProduct = (props) => {
  return (
    <div className="flex h-14 py-1 bg-white border items-center justify-between px-5">
      <div>{props.id}</div>
      <div className="flex items-center justify-center">
        <Image
          src={props.product?.imageSrc || "/images/avatar.png"}
          width={40}
          height={40}
        />
      </div>
      <div>{props.product?.name}</div>
      <div>{props.product?.OrderProduct?.quantity}x</div>
      <div>{props.product?.price}</div>
    </div>
  );
};

export default ListProduct;
