

const SmallModal = ({ children, theme }) => {
  return (
      <div className="modal-styles open ">
          <div className="modal-body show">
            <div>
              <div className={theme ? "modal-content dark-card" : "modal-content light-card"}>
                {children}
              </div>
            </div>
          </div>
      </div>
  
  );
};

export default SmallModal;
