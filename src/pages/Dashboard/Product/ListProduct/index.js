import React from "react";
import Image from "next/image";
const ListProduct = (props) => {
  return (
    <tr className="text-center hover:bg-gray-200 bg-white">
      <td className="py-4 px-2 border-b border-grey-light">
        {props.products.id}
      </td>
      <td className="px-2 border-b border-grey-light">
        <div className="flex justify-center">
          <Image
            src={props.products.imageSrc || "/images/no-photos.png"}
            width={64}
            height={64}
          />
        </div>
      </td>
      <td className="py-4 px-2 border-b border-grey-light text-left">
        {props.products.name}
      </td>
      <td className="py-4 px-2  border-b border-grey-light">
        {props.products.price}
      </td>
      <td className="py-4 px-2 border-b border-grey-light">
        {props.products.isActive ? (
          <p className="text-green-500">Active</p>
        ) : (
          <p className="text-red-400">Inactive</p>
        )}
      </td>
      <td className="py-4 px-2 border-b border-grey-light">0</td>
      <td className="py-4 px-2 border-b border-grey-light">
        {props.products.Category?.name}
      </td>
      <td className="py-4 px-2 border-b border-grey-light">{}</td>
    </tr>
  );
};

export default ListProduct;
