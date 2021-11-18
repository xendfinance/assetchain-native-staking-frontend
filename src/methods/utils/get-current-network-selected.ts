
export const getCurrentSelectedNetwork = () => {
   
   try {
    let connector: any = localStorage.getItem("CONNECTION_DETAILS");
    let { chainId } = JSON.parse(connector);
    return chainId;

   } catch (error) {
       
   }
}