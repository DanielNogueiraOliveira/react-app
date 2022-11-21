import "./App.css";
import AppProjectPayment from "./AppProjectPayment";

export default function AppPaidError(props){

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
						<p>O pagamento <strong>não</strong> foi concluído com sucesso.</p>
					</div>
					<div className="div-button-paid-sucess">
						<button className="button-paid-error" onClick={closeModal}>Fechar</button>
						<button className="button-paid-error" onClick= {props.changeModal}>Retornar</button>
					</div>
				</div>
		</div>
	)
}