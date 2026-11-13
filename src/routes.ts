import { Router } from "express"; // Importa o módulo Router do express
import type { Request, Response } from "express"; // Importa os módulos de requisição e resposta
import ClienteController from "./controller/ClienteController.js"; // Importa o controlador de clientes
const router = Router(); // cria uma instância de Router

router.get("/api", (req: Request, res: Response) => {
    res.status(200).json({ mensagem: "Olá, seja bem-vindo!" });
});

// CLIENTES  <= ADICIONE
router.get("/api/cliente", ClienteController.todos);
router.post("/api/cliente", ClienteController.novo);
router.put("/api/cliente/:idCliente", ClienteController.atualizarCliente);

export { router }; // Exporta o roteador