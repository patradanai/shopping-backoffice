import React from "react";
import Image from "next/image";

const ListProduct = (props) => {
  return (
    <tr className="text-center hover:bg-gray-200 bg-white">
      <td className="py-4 px-2 border-b">{props.products.id}</td>
      <td className="px-2 py-2 border-b">
        <div className="flex justify-center">
          <div className="flex justify-center w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={props.products.imageSrc || "/images/no-photos.png"}
              width={64}
              height={64}
            />
          </div>
        </div>
      </td>
      <td className="py-4 px-2 border-b text-left">{props.products.name}</td>
      <td className="py-4 px-2  border-b">{props.products.price}</td>
      <td className="py-4 px-2 border-b">
        {props.products.isActive ? (
          <p className="text-green-500">Active</p>
        ) : (
          <p className="text-red-400">Inactive</p>
        )}
      </td>
      <td className="py-4 px-2 border-b">0</td>
      <td className="py-4 px-2 border-b">{props.products.Category?.name}</td>
      <td className="py-4 px-2 border-b">{}</td>
    </tr>
  );
};

export default ListProduct;
