import "./App.css";

export default function AppPaidSucess(){

	const closeModal = ()=> {
		window.location.reload();
	}

	return(
      <div className="modal-container">
    		<div className="modal-sucesso">  
		      	<div className="modal-sucesso-titulo">
		      		<h2>Recibo de pagamento</h2>
		      	</div>
		      	<div className="modal-sucesso-body">
		      		<p>O pagamento foi concluído com sucesso.</p><br/>
		      		<p>Obrigado!</p>
		      	</div>
				  <div className="div-button-paid-sucess">
					  <button className="button-paid-sucess" onClick={closeModal}>Fechar</button>
				  </div>
	      	</div>
      </div>
	)
}