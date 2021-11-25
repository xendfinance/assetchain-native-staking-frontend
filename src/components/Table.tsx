import { Button } from "components";
import { FC } from "react";
import { combineReducers } from "redux";
import { TableRow } from "./TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { QuestionCircleOutlined } from '@ant-design/icons';
// import { _isAnEmpytyObject } from "utils";
// import { lightThemeLogo } from "images";

type PaginationProps = {
	pages: number;
	page: number;
	changePage: (page: number) => void;
};

type TableProps = {
	header?: any;
	data?: any;
	type?: any;
	walletTable?: any;
	loading?: any;
	pagination?: any;
	newPage?: any;
	p2p?: any;
	rest?: any;
	dataWithdraw?:any;
	address:any;
};

export const Table: FC<TableProps> = ({
	header,
	data,
	type,
	walletTable,
	loading,
	pagination,
	newPage,
	p2p,
	dataWithdraw,
	address,
	...rest
}) => {
	// const history = useHistory();
	const changePage = (page: number) => {
		newPage(page);
	};



	return (
		<div {...rest} className="table-cont">
			<div className="table-scroll overflow-x-auto">
				<table className="table">
					<thead className="t-head">
						{header =="ActiveStaking"?
						<tr className="font-medium text-sm">
						<th>Start Date</th>
						<th>End Date</th>
						<th>
						<Tooltip
						title='The minimum withdrawal period before you can withdraw your staked tokens. NOTE: withdrawing before end date will lead to slash of reward'
						placement="top"
						>
						<div>
						<span>Minimum Withdrawal Date</span><QuestionCircleOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
						</div>
						</Tooltip>
						</th>
						<th>Total Staked</th>
						<th>Total Reward</th>
						<th>Period</th>
						<th>Category</th>
						<th>APR</th>
				    	</tr>
						:
						<tr className="font-medium text-sm">
						<th>Total Staked</th>
						<th>Total Reward</th>
						<th>Total Withdrawn</th>
						<th>Period</th>
						<th>Category</th>
						<th>APR</th>
						</tr>
					
					}
						
					</thead>

					{Boolean(data?.length) && (
						<tbody className="t-body">
							  {header =="ActiveStaking"?
							  data.map((item) => (
								<TableRow
								  rowData = {item}
								  type={header}
								  address={address}
								></TableRow>
						     )):
							 dataWithdraw.map((item) => (
								<TableRow
								  rowData = {item}
								  type={header}
								  address={address}
								></TableRow>
						     ))
							 }
							
							{/* {data?.map((data: any, i: any) => (
								<tr key={i} className="bg-primary font-normal text-sm">
									{header?.map((item: any, i: any) =>
										item?.component ? (
											<td key={i}>
												{item.component({ item: data[item?.key], data })
												}
												
											</td>
											
										) : (
											<td key={i}>{data[item?.key]
											}											
											</td>
											
										)
									)}
									 <Button                    
								text="Withdraw"
								type="button"
								className="stake-btn"
								//onClick={Number(amount) > 0  ? () => performStaking() : undefined  }
							 	/>
							</tr>
							))} */}
						</tbody>
					)}
				</table>

    {/* <table>
      <tr key={"header"}>
        {Object.keys(data[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {data.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table> */}

				{!Boolean(data?.length) && (
					<div className="w-full h-full empty-cont">
						{/* <img className="empty-cont" src={lightThemeLogo} alt="" /> */}
						{loading ? (
							<>Loading Data . . .</>
						) : (
							<p>No Data!</p>
						)}
					</div>
				)}
			</div>

			{/* {pagination &&
				!_isAnEmpytyObject(pagination) &&
				Number(pagination?.pages) > 1 && (
					<div className="pagination">
						<div className="flex flex-nowrap items-center pages">
							{pagination?.page > 1 && (
								<img
									src={angleLeft}
									alt="previous"
									onClick={() => changePage(Number(pagination?.page) - 1)}
								/>
							)}

							<Pagination
								pages={pagination?.pages}
								page={Number(pagination?.page)}
								changePage={changePage}
							/>

							{pagination?.page < pagination?.pages && (
								<img
									src={angleRight}
									alt="next"
									onClick={() => changePage(Number(pagination?.page) + 1)}
								/>
							)}
						</div>
					</div>
				)} */}
		</div>
	);
};

const Pagination = ({
	pages,
	page,
	changePage,
}: PaginationProps): JSX.Element | null => {
	let allPages: any = [];
	for (let i = 1; i <= pages; i++) {
		allPages.push(i);
	}
	const multiples = pages / 100;
	const cap = Math.ceil((page / pages) * multiples) * 100;
	const range = [cap - 100, cap];
	const pageDiff = pages - cap;

	if (pages > 10 && range[0] === 0 && pageDiff > 2) {
		return (
			<>
				{allPages
					?.slice(range[0], range[1])
					?.map((eachPage: any, i: number) => (
						<span
							className={`page ${
								eachPage === page ? "active" : "cursor-pointer"
							}`}
							onClick={() => eachPage !== page && changePage(eachPage)}
							key={i}
						>
							{eachPage}
						</span>
					))}
				<span
					className="page cursor-pointer ellipse"
					onClick={() => changePage(range[1] + 1)}
				>
					. . .
				</span>
				{allPages
					?.slice(-2, allPages.length)
					?.map((eachPage: any, i: number) => (
						<span
							className={`page ${
								eachPage === page ? "active" : "cursor-pointer"
							}`}
							onClick={() => eachPage !== page && changePage(eachPage)}
							key={i}
						>
							{eachPage}
						</span>
					))}
			</>
		);
	}

	if (pages > 100 && range[0] >= 1 && pageDiff <= 2) {
		return (
			<>
				<span className="page cursor-pointer" onClick={() => changePage(1)}>
					1
				</span>
				<span
					className="page cursor-pointer ellipse"
					onClick={() => changePage(range[0])}
				>
					. . .
				</span>
				{allPages
					?.slice(range[0], allPages.length)
					?.map((eachPage: any, i: number) => (
						<span
							className={`page ${
								eachPage === page ? "active" : "cursor-pointer"
							}`}
							onClick={() => eachPage !== page && changePage(eachPage)}
							key={i}
						>
							{eachPage}
						</span>
					))}
			</>
		);
	}

	if (pages > 100 && range[0] >= 1 && pageDiff > 2) {
		return (
			<>
				<span className="page cursor-pointer" onClick={() => changePage(1)}>
					1
				</span>
				<span
					className="page cursor-pointer ellipse"
					onClick={() => changePage(range[0])}
				>
					. . .
				</span>
				{allPages
					?.slice(range[0], range[1])
					?.map((eachPage: any, i: number) => (
						<span
							className={`page ${
								eachPage === page ? "active" : "cursor-pointer"
							}`}
							onClick={() => eachPage !== page && changePage(eachPage)}
							key={i}
						>
							{eachPage}
						</span>
					))}
				<span
					className="page cursor-pointer ellipse"
					onClick={() => changePage(range[1] + 1)}
				>
					. . .
				</span>
				{allPages
					?.slice(-2, allPages.length)
					?.map((eachPage: any, i: number) => (
						<span
							className={`page ${
								eachPage === page ? "active" : "cursor-pointer"
							}`}
							onClick={() => eachPage !== page && changePage(eachPage)}
							key={i}
						>
							{eachPage}
						</span>
					))}
			</>
		);
	}

	return (
		<>
			{allPages?.map((eachPage: any, i: number) => (
				<span
					className={`page ${eachPage === page ? "active" : "cursor-pointer"}`}
					onClick={() => eachPage !== page && changePage(eachPage)}
					key={i}
				>
					{eachPage}
				</span>
			))}
		</>
	);
};

