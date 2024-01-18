//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
const network = bitcoin.networks.testnet //caso queira rodar na rede real é so trocar testnet por bitcoin

//derivação de carteiras HD
const path = `m/49'/1'/0'/0`   // criando derivatvo da carteira main net(bitcoin) é `m/49'/0'/0'/0`

//pra criar as palavras aleatorias pra gerar a seed
//criando as palavras mnemonic para seed (palavra senha )
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

//criando uma conta - par pvt-pub keys
let account = root.derivePath(path)
//uma carteira raiz que vai derivando as outras
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", mnemonic)

