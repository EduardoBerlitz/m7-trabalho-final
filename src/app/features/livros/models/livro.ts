export type StatusLivro =
  "disponivel" | "emprestado" | "esgotado";

export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  categoria?: string;
  ano: number;
  status: StatusLivro;
  descricao: string;
}
