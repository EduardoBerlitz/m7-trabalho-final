import { TestBed } from "@angular/core/testing";
import { beforeEach, describe, expect, it } from "vitest";
import { LivrosService } from "./livros.service";

describe("LivrosService", () => {
  let service: LivrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivrosService);
  });

  it("deve listar os livros", async () => {
    const livros = await service.listar();
    expect(livros).toHaveLength(5);
  });

  it("deve buscar um livro por id", async () => {
    const livro = await service.buscarPorId(1);

    expect(livro?.titulo)
      .toBe("Dom Casmurro");
  });

});
