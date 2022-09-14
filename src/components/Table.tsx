
import { FC } from "react";
import { TableRow } from "./TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { QuestionCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

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

console.log(data);
console.log(dataWithdraw);
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
						<span>Min. Withdrawal Date</span><WarningOutlined style={{ color: '#FF6600',paddingLeft:'3px' }} />
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

					
						<tbody className="t-body">
							{header =="ActiveStaking"?
							  Boolean(data?.length) &&(
								data.map((item) => (
									<TableRow
									key = {item.id}
									rowData = {item}
									type={header}
									address={address}
									></TableRow>
								))
							 ):
								Boolean(dataWithdraw?.length) &&(
								dataWithdraw.map((item) => (
									<TableRow
									key = {item.id}
									rowData = {item}
									type={header}
									address={address}
									></TableRow>
								))
							 )
							}
						
						</tbody>
				
					
				</table>

    

				{(!Boolean(data?.length)) && (header == "ActiveStaking")  && (
					<div className=" empty-cont">
					 
                        {!loading && data?.length > 0 ? (
							<>Loading Active Staking . . .</>
						) : (
							<p>No Active Staking</p>
						)}
                       

						
					</div>
				)}

				{(!Boolean(dataWithdraw?.length)) && (header == "History")  && (
						<div className=" empty-cont">
					 
                        {!loading && dataWithdraw?.length > 0 ? (
							<>Loading Staking History . . .</>
						) : (
							<p>No Staking History</p>
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

