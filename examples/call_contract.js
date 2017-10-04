import { Apis } from "sbitjs-ws";
import { ChainStore, FetchChain, PrivateKey, TransactionBuilder } from "../lib";

var privKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
let pKey = PrivateKey.fromWif(privKey);
let appKey = PrivateKey.fromWif("5KUNaHFinDenZXE3A7BB4YKFRJfnNEPpJWB3wG6N2RyaekEDAye");

Apis.instance("ws://127.0.0.1:8090/ws", true)
    .init_promise.then((res) => {
        console.log("connected to:", res[0].network_name, "network");
        ChainStore.init().then(() => {
            let fromAccount = "nathan";

            Promise.all([
                FetchChain("getAccount", fromAccount)
            ]).then((res) => {
                // console.log("got data:", res);
                let [fromAccount] = res;

                // Memos are optional, but if you have one you need to encrypt it here

                let tr = new TransactionBuilder();

                tr.add_type_operation("call_contract_with_verification", {
                    fee: {
                        amount: 0,
                        asset_id: "1.3.0"
                    },
                    registrar: fromAccount.get("id"),
                    receiver: "1.16.1",
                    
                    value: 0,
                    gasPrice: 0,
                    gas: 100000,
                    code: "",
                    app: appKey.toPublicKey().toPublicKeyString()
                });
                tr.set_required_fees().then(() => {
                    tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                    tr.add_signer(appKey, appKey.toPublicKey().toPublicKeyString());
                    console.log("serialized transaction:", tr.serialize());
                    tr.broadcast();
                }).catch((reason) => {
                    console.log("error", reason);
                });
            });
        });
    });
