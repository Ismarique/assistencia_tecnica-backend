export interface AgendamentoDTO {
	id_agendamento?: number;
	data_concerto: Date | string;
	id_cliente: number;
	id_equipamento: number;
}
