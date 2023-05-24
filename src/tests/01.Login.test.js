import { screen, waitFor } from "@testing-library/react"
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from "../App";
import userEvent from "@testing-library/user-event";

describe('testa página de login', () => {
  it('testa a renderização dos componentes', () => {
    renderWithRouterAndRedux(<App />)
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    const playBtn = screen.getByTestId('btn-play');
    const configBtn = screen.getByTestId('btn-settings');
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(playBtn).toBeInTheDocument();
    expect(configBtn).toBeInTheDocument();
  });

  it('testa se o botão está desabilitado quando os inputs estiverem vazios', () => {
    renderWithRouterAndRedux(<App />)
    const playBtn = screen.getByTestId('btn-play');
    expect(playBtn).toBeDisabled();
  });
  it('testa se o botão está desabilitado quando apenas um input estiver preenchido', () => {
    renderWithRouterAndRedux(<App />)
    const playBtn = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    expect(playBtn).toBeDisabled();
    userEvent.type(inputName, 'Usuário');
    expect(playBtn).toBeDisabled();
  });
  it('testa se o botão está habilitado quando os inputs estiverem preenchidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(playBtn).toBeDisabled();
    userEvent.type(inputName, 'Usuário');
    expect(playBtn).toBeDisabled();
    userEvent.type(inputEmail, 'trybe@trybe.com');
    expect(playBtn).toBeEnabled();
  });
  it('testa se no click do botão play a rota será /game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const playBtn = screen.getByTestId('btn-play');
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId('input-gravatar-email');
    userEvent.type(inputName, 'Usuário');
    userEvent.type(inputEmail, 'trybe@trybe.com');

    await waitFor(() => {
      userEvent.click(playBtn);
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    }, {timeout: 5000})

  });
  it('testa se no click de botão de configurações a rota será "settings"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const configBtn = screen.getByTestId('btn-settings');
    userEvent.click(configBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });
});
