import { Button } from "components";
import PerformWithdraw from "methods/contracts/actions/performWithdraw";
import moment from "moment";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";




type TableRowProps = {
	rowData:any;
	type:any;
	address:any;
};

export const TableRow: FC<TableRowProps> = ({
	rowData,
	type,
	address
}) => {

	const dispatch = useDispatch();

	const performWithdraw = (categoryId:any,minimumWithdrawDate:any,endDate:any) => {
       
		const res = !moment().isBefore(endDate);
		const resBeforeMin = !moment().isBefore(minimumWithdrawDate);

		if(resBeforeMin){
          // show notification
		
		  dispatch(PerformWithdraw({categoryId:categoryId,client:address}))
		  return;
		  
		}else if(res){
          //do withdraw no notification
		  dispatch(PerformWithdraw({categoryId:categoryId,client:address}))
		  return;
		}else{
         //no withdraw show notification
		 return;
		}
    }

	return (
		<tr className="bg-primary font-normal text-sm">
			    {type=="ActiveStaking"?
				<>
				<td>{rowData?.StartDate}</td>		  
				<td>{rowData?.EndDate}</td> 
				<td>{rowData?.MinimumWithdrawalDate}</td> 
				<td>{rowData?.StakedTokens}</td> 
				<td>{rowData?.RewardTokens}</td> 
				<td>{rowData?.TotalDays}</td> 
				<td>{rowData?.Name}</td> 
				<td>{rowData?.APR}</td> 
				<td><Button                    
								text="Withdraw"
								type="button"
								className="stake-btn"
								//disabled={!moment().isBefore(rowData?.MinimumWithdrawalDate)}
								onClick={() => performWithdraw(rowData?.id,rowData?.MinimumWithdrawalDate,rowData?.MinimumWithdrawalDate)}
								
				/></td>
			   </>
				:
               <>
				<td>{rowData?.StakedTokens}</td> 
				<td>{rowData?.RewardTokens}</td> 
				<td>{rowData?.TotalWithdrawal}</td> 
				<td>{rowData?.TotalDays}</td> 
				<td>{rowData?.Name}</td> 
				<td>{rowData?.APR}</td> 				
			   </>
			
			}
				
						
		</tr>

	)
};

