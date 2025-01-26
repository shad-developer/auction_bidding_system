import React, { useEffect } from "react";
import { Container, Heading } from "../common/Design";
import ProductCard from "../cards/ProductCard";
import useBiddingHistory from "../../hooks/useBiddingHistory";

export const LiveProducts = ({ products }) => {
  const { highestBid } = useBiddingHistory();

  return (
    <section className="product-home">
      <Container>
        <Heading
          title="Live Auction"
          subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, consequuntur ad.
"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 my-8">
          {products?.slice(0, 4)?.map((item, index) => (
            <ProductCard
              item={item}
              key={index}
              highestBid={highestBid(item._id)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
