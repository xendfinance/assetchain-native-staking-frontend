import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const SmallSideLoader = () => {


	return (
		<SmallSideLoaderStyle>
			{
				// backgroundTask.length > 0 ?
					<i className="fa fa-spinner fa-spin"></i> 
			}
		</SmallSideLoaderStyle>
	)
}


export default SmallSideLoader;


const SmallSideLoaderStyle = styled.div`
	display: inline-block;
	color: ${p => p.theme.fontAlt};
`;