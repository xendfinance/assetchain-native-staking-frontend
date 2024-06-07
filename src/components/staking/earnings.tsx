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
      <CardTitle> WNT Stats</CardTitle>
      <DescriptionContainer>
        <div>
          <Description> WNT PRICE</Description>
          <DescriptionValue> ${usdQuote} </DescriptionValue>
        </div>

        {/* <div>
          <Description> DAILY REWARDS</Description>
          <DescriptionValue>0 WNT</DescriptionValue>
        </div> */}
        {/* <div>
          <Description> CIRCULATING SUPPLY</Description>
          <DescriptionValue>
            {" "}
            {numberWithCommaswithoutdecimals(circulatingSupply)}WNT
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
