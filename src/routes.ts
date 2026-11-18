import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import ClienteController from "./controller/ClienteController.js"; // Importa o controlador de clientes
import EquipamentoController from "./controller/EquipamentoController.js"; // Importa o controlador de equipamentos
import AgendamentoController from "./controller/AgendamentoController.js"; // Importa o controlador de agendamentos
const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

// CLIENTES  <= ADICIONE
router.get("/api/cliente", ClienteController.todos);
router.post("/api/cliente", ClienteController.novo);
router.put("/api/cliente/:idCliente", ClienteController.atualizarCliente);

// EQUIPAMENTOS
router.get("/api/equipamento", EquipamentoController.todos);
router.post("/api/equipamento", EquipamentoController.novo);
router.put("/api/equipamento/:idEquipamento", EquipamentoController.atualizarEquipamento);

// AGENDAMENTOS
router.get("/api/agendamento", AgendamentoController.todos);
router.post("/api/agendamento", AgendamentoController.novo);
router.put("/api/agendamento/:idAgendamento", AgendamentoController.atualizarAgendamento);

export { router }; // Exporta o roteador