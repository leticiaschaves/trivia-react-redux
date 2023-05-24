import { act, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testa página do ranking', () => {
  const mock = [{"name":"Zahir Terrell","picture":"https://www.gravatar.com/avatar/244861fa0af7813f136264fbe23d4f5b","score":40},
    {"name":"Denton Woods","picture":"https://www.gravatar.com/avatar/d92f1d2798cd7f7bf1be6aed0a35fa78","score":10}];
  
  it('Testa os componentes', () => {
    act(() => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/ranking');
    })
    const goHome = screen.getByTestId('btn-go-home');
    expect(goHome).toBeInTheDocument();
    fireEvent.click(goHome);
  });

  it('Testa se o usuário é redirecionado para a tela de início no clique', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');
    const goHome = await screen.findByTestId('btn-go-home');
    act(() => fireEvent.click(goHome));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa os dados do jogador', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    localStorage.setItem('ranking', JSON.stringify(mock));
    history.push('/ranking');
    expect(await screen.findByTestId('ranking-title')).toBeInTheDocument();
    expect(await screen.findAllByTestId('header-profile-picture')).toHaveLength(2);
  });
});
