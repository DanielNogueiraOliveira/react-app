import React, {useState} from "react";
import axios from 'axios';
import "./App.css";
import AppPaidSucess from "./AppPaidSucess";
import AppPaidError from "./AppPaidError";

export default function AppPayment(props){
	console.log("Name", props);

	const [valor, setValor] = useState("");
	const [cartao, setCartao] = useState("");
	const [modal, setModal] = useState(false);
	const [sucesso, setSucesso] = useState(false);
	console.log(valor);
    
    let cards = [
	  // valid card
	  {
	    card_number: '1111111111111111',
	    cvv: 789,
	    expiry_date: '01/18',
	  },
	  // invalid card
	  {
	    card_number: '4111111111111234',
	    cvv: 123,
	    expiry_date: '01/20',
	  },
	];
	
	var inputDoValor;
	var selectCartao;
	const submitValue = () => {
		if(valor === ""){
			inputDoValor.focus()
		}else if(cartao === ""){
			selectCartao.focus();
		} else {
			console.log("Valor ", valor);
			console.log("Cartão ", cartao);

			let payload = {
				"card_number": cartao.card_number,
				"cvv": cartao.cvv,
				"expiry_date": cartao.expiry_date,
			
				// Destination User ID
				"destination_user_id": props.idUsuario,
			
				// Value of the Transaction
				"value": valor
			}
			
			console.log("payload ", payload);
			
			axios.post(`https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989`, { payload })
				.then(res => {
					console.log(res);
					console.log(res.data);
					setModal(true);

					if(cartao.card_number == "4111111111111234"){
						setSucesso(false);
					}else{
						setSucesso(true);
					}
				})
			}
	}

	function handleChange(e){
		console.log("e.target.value ", e.target.value);
		console.log("CARDS ", cards[e.target.value]);
		setCartao( cards[e.target.value]);
	}

	function formatCurrency (e) {
        const letterPattern = /[^0-9]/;
        if (letterPattern.test(e.key)) {
            e.preventDefault();
            return;
        }
        if (!e.currentTarget.value) return;

        let valor = e.currentTarget.value.toString();
        valor = valor.replace(/[\D]+/g, '');
        valor = valor.replace(/([0-9]{1})$/g, ",$1");

        if (valor.length >= 6) {
            while (/([0-9]{4})[,|.]/g.test(valor)) {
                valor = valor.replace(/([0-9]{1})$/g, ",$1");
                valor = valor.replace(/([0-9]{3})[,|.]/g, ".$1");
            }
        }

        e.currentTarget.value = valor;
    }

    const changeErro = () => {
    	setModal(false)
    }
      
	return(
		<>		
			{ !modal &&	
				<div>
					<h1 className="titulo-pagamento"> Pagamento para <i>{props.nameUser}</i></h1>
					<div className="dados-pagamento">
						<div className="box-pagamentos">
							<input type="text" onKeyPress={(event)=>{formatCurrency(event)}} placeholder="R$ 0,00" 
							    ref={input => inputDoValor = input }    onChange={(e)=> setValor(e.target.value)} className="box-pagamentos-input" />
							<div className="select-box">
								<select className="dados-pagamento-select" ref={select => selectCartao = select} onChange={handleChange}>
									<option>Nº do Cartão</option>
									{cards.map((card, index) =>                              
											<option value={index} key={index}>
												Cartão com o final {card.card_number.substr(-4)}
											</option>                                
										)}
								</select>
							</div>
							<div className="button-pagamento">
								<button onClick={submitValue}>Pagar</button>
							</div>
						</div>
					</div>
				</div>
			}	
				{modal && sucesso && <AppPaidSucess/>}
				{modal && !sucesso && <AppPaidError changeModal={changeErro} />}
		</>
	)
}