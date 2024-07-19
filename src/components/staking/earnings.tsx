import { useSelector } from "react-redux";
import {
  LongCardContainer,
  Description,
  DescriptionValue,
  DescriptionContainer,
  CardTitle,
  Badge,
} from "./stakingstyles.js";
//import { numberWithCommaswithoutdecimals } from "../methods/helper";

const Earnings = () => {
  const { circulatingSupply, usdQuote } = useSelector((store: any) => store.MarketReducer);

  return (
    <LongCardContainer>
      <CardTitle> RWA Stats</CardTitle>
      <DescriptionContainer>
        <div>
          <Description> RWA PRICE</Description>
          <DescriptionValue> ${usdQuote} </DescriptionValue>
        </div>

        {/* <div>
          <Description> DAILY REWARDS</Description>
          <DescriptionValue>0 RWA</DescriptionValue>
        </div> */}
        {/* <div>
          <Description> CIRCULATING SUPPLY</Description>
          <DescriptionValue>
            {" "}
            {numberWithCommaswithoutdecimals(circulatingSupply)}RWA
          </DescriptionValue>
        </div> */}
      </DescriptionContainer>
      <Badge>
        <img src="./assets/chart-pie.svg" height="20" alt="scale" />
      </Badge>
    </LongCardContainer>
  );
};

export default Earnings;
