const { setupDesktop, login, carregarRequisicao } = require('./setup');
const { By } = require('selenium-webdriver');
const assert = require("assert");
const fs = require('fs');
const path = require('path');

describe('Script de realizar ponto no computador', function () {
    let driver;

    before(async function () {
        driver = await setupDesktop();
        await login(driver)
    });

    it('Acessar tela do Ponto', async function () {
        let pontoEletronico = await driver.findElement(By.id('pdtDispPontoElet'));
        await pontoEletronico.click();

        await carregarRequisicao(driver, 'http://localhost:4200/#/inicio')

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('http://localhost:4200/#/ponto', currentUrl);

        await driver.sleep(2000);
    });

    it('Registrar Ponto', async function () {
        let registrarPonto = await driver.findElement(By.id('registrarPonto'));
        await registrarPonto.click();

        await carregarRequisicao(driver, 'http://localhost:4200/#/ponto')

        let currentUrl = await driver.getCurrentUrl();
        assert.equal('http://localhost:4200/#/ponto/bater-ponto', currentUrl);

        await driver.sleep(2000);
    });

    it('Registrar Entrada', async function () {
        await driver.get('http://localhost:4200/#/ponto/bater-ponto');
        await driver.sleep(1000);
        let registarEntrada = await driver.findElement(By.id('registarEntrada'));
        await registarEntrada.click();
        await driver.sleep(1000);
        await confirmacaoRegistroPonto();
    });

    it('Registrar Saida', async function () {
        await driver.get('http://localhost:4200/#/ponto/bater-ponto');
        await driver.sleep(1000);
        let registarSaida = await driver.findElement(By.id('registarSaida'));
        await registarSaida.click();
        await driver.sleep(1000);
        await confirmacaoRegistroPonto();
    });

    after(async () => await driver.quit());

    async function confirmacaoRegistroPonto() {
        console.log('Abrindo dialog e confirmando registro e adquirindo comprovante');
        let observacao = await driver.findElement(By.css('textarea'));
        await observacao.sendKeys('Teste de registro de Saida padrão Selenium');

        let registarPonto = await driver.findElement(By.id('confirmarRegistroPonto'));
        await registarPonto.click();

        await driver.sleep(2000);

        let comprovante = await driver.findElement(By.id('adquirirComprovante'));
        await comprovante.click();

        return
    }

});
