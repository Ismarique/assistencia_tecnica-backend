import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import ClienteController from "./controller/ClienteController.js"; // Importa o controlador de clientes
import EquipamentoController from "./controller/EquipamentoController.js"; // Importa o controlador de equipamentos
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

export { router }; // Exporta o roteador