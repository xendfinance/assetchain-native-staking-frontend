import styled  from "styled-components";
import { Button } from "components";
import PerformWithdraw from "methods/contracts/actions/performWithdraw";
import moment from "moment";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { notify } from './core/Notifier';
import { notification } from "antd";




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
       
		const res = moment().isBefore(endDate);
		const resBeforeMin = moment().isBefore(minimumWithdrawDate);
       
        
		if(!resBeforeMin && res){
            notification['warning']({
				message: 'Withdrawing Staked Funds',
				description: "You will incur a penalty if withdrawing funds before minimum withdrawal date",
				placement:"bottomRight",
				duration:5,
			   
			  });
		
		  dispatch(PerformWithdraw({categoryId:categoryId,client:address}))
		  
		  return;
		  
		}


		if(!res){
			notification['success']({
						message: 'Withdrawing Staked Funds',
						description: "Staked funds will be withdrawn",
						placement:"bottomRight",
						duration:5,
					   
					  });
		
		  dispatch(PerformWithdraw({categoryId:categoryId,client:address}))
		  
		  return;
		  
		}

		notification['error']({
			message: 'Withdrawing Staked Funds',
			description: "You cannot withdraw funds before minimum withdrawal date",
			placement:"bottomRight",
			duration:5,
		   
		  });
		return;
        

    }

	return (
		<TableRowStyle>
			    {type=="ActiveStaking"?
				<>
				<td>{rowData?.StartDate}</td>		  
				<td>{rowData?.EndDate}</td> 
				<td>{rowData?.MinimumWithdrawalDate}</td> 
				<td>{rowData?.StakedTokens}</td> 
				<td>{rowData?.RewardTokens}</td> 
				<td>{rowData?.TotalDays}</td> 
				<td>{rowData?.Name}</td> 
				<td>{rowData?.APR}%</td> 
				<td><Button                    
								text="Withdraw"
								type="button"
								className="stake-btn"
								//disabled={!moment().isBefore(rowData?.MinimumWithdrawalDate)}
								onClick={() => performWithdraw(rowData?.id,rowData?.MinimumWithdrawalDate,rowData?.EndDate)}
								
				/></td>
			   </>
				:
               <>
				<td>{rowData?.StakedTokens}</td> 
				<td>{rowData?.RewardTokens}</td> 
				<td>{rowData?.TotalWithdrawal}</td> 
				<td>{rowData?.TotalDays}</td> 
				<td>{rowData?.Name}</td> 
				<td>{rowData?.APR}%</td> 				
			   </>
			
			}
				
						
		</TableRowStyle>

	)
};


const TableRowStyle = styled.tr`
	min-height: 40vh;
`
