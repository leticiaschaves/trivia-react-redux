import { fireEvent, screen } from "@testing-library/react";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testa página do ranking', () => {
    renderWithRouterAndRedux(< Ranking />);

    const goHome = screen.getByTestId('btn-go-home');
  it('Testa os componentes', () => {
    expect(goHome).toBeInTheDocument();
    fireEvent.click(goHome);
  });

  it('Testa se o usuário é redirecionado para a tela de início no clique', () => {
    fireEvent.click(goHome);
    expect(history.location.pathname).toBe('/');
  });

  it('Testa os dados do jogador', () => {
    expect(screen.getByTestId('ranking-title')).toBeInTheDocument();
    expect(screen.getByTestId('player-name-0')).toBeInTheDocument();
    expect(screen.getByTestId('player-score-0')).toBeInTheDocument();
  });
});
