import { DatabaseModel } from "./DatabaseModel.js";

const database = new DatabaseModel().pool;

export class Equipamento {
  private id_equipamento?: number;
  private id_cliente: number;
  private modelo: string;
  private descricao: string;
  private custo_manutencao: number;

  constructor( _id_cliente: number, _modelo: string, _descricao: string, _custo_manutencao: number) {    
    this.id_cliente = _id_cliente;
    this.modelo = _modelo;
    this.descricao = _descricao;
    this.custo_manutencao = _custo_manutencao;
  }

  // ========== GETTERS ==========
  public getIdEquipamento(): number | undefined { return this.id_equipamento; }
  public getIdCliente(): number | undefined { return this.id_cliente; }
  public getModelo(): string { return this.modelo; }
  public getDescricao(): string { return this.descricao; }
  public getCustoManutencao(): number { return this.custo_manutencao; }

  // ========== SETTERS ==========
  public setIdEquipamento(_idEquipamento: number): void { this.id_equipamento = _idEquipamento }
  public setIdCliente(_idCliente: number): void { this.id_cliente = _idCliente }
  public setModelo(_modelo: string): void { this.modelo = _modelo; }
  public setDescricao(_descricao: string): void { this.descricao = _descricao; }
  public setCustoManutencao(_custo_manutencao: number): void { this.custo_manutencao = _custo_manutencao; }

  static async listarEquipamento(): Promise<Array<Equipamento> | null> {
    try {
      let listaDeEquipamento: Array<Equipamento> = [];
      const querySelectEquipamento = `SELECT * FROM equipamento;`;

      const respostaBD = await database.query(querySelectEquipamento);

      // Percorre cada linha retornada pela consulta
      respostaBD.rows.forEach((equipamentoBD) => {
        // Cria um novo objeto Equipamento usando os dados da linha atual (modelo, descricao, custo_manutencao)
        const novoEquipamento: Equipamento = new Equipamento(
          equipamentoBD.id_cliente,
          equipamentoBD.modelo.toUpperCase(),
          equipamentoBD.descricao.toUpperCase(),
          equipamentoBD.custo_manutencao
        );

        novoEquipamento.setIdEquipamento(equipamentoBD.id_equipamento);
        console.log(novoEquipamento);
        listaDeEquipamento.push(novoEquipamento);

      });

      return listaDeEquipamento;
    } catch (error) {
      console.error(`Erro na consulta ao banco de dados. ${error}`);
      return null;
    }
  }


  // CREATE
  static async cadastrarEquipamento(equipamento: Equipamento): Promise<boolean> {
    try {
      const queryInsertEquipamento = `INSERT INTO Equipamento (id_cliente, modelo, descricao, custo_manutencao)
        VALUES ( $1, $2, $3, $4 )
        RETURNING id_equipamento;`;

      const result = await database.query(queryInsertEquipamento, [
        equipamento.id_cliente,
        equipamento.modelo.toUpperCase(),
        equipamento.descricao.toUpperCase(),
        equipamento.custo_manutencao
      ]);

      if (result.rows.length > 0) {
        console.log(`Equipamento cadastrado com sucesso. ID: ${result.rows[0].id_equipamento}`);
        return true;
      }

      return false;

    } catch (error) {
      console.error(`Erro ao cadastrar equipamento: ${error}`);
      return false
    }
  }

  static async atualizarEquipamento(
    idEquipamento: number,
    campos: { modelo?: string; descricao?: string; custo_manutencao?: number }
  ): Promise<boolean> {
    try {
      const queryUpdateEquipamento = `UPDATE Equipamento SET
        modelo = COALESCE($1, modelo),
        descricao = COALESCE($2, descricao),
        custo_manutencao = COALESCE($3, custo_manutencao)
        WHERE id_equipamento = $4
        RETURNING id_equipamento;`;

      const result = await database.query(queryUpdateEquipamento, [
        campos.modelo?.toUpperCase(),
        campos.descricao?.toUpperCase(),
        campos.custo_manutencao,
        idEquipamento
      ]);

      if (result.rows.length > 0) {
        console.log(`Equipamento atualizado com sucesso. ID: ${result.rows[0].id_equipamento}`);
        return true;
      }

      return false;

    } catch (error) {
      console.error(`Erro ao atualizar equipamento: ${error}`);
      return false;
    }
  }

}
