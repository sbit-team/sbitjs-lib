import { Apis } from "sbitjs-ws";
import { ChainStore, FetchChain, EthAddress } from "../lib";
Apis.instance("wss://sbit.pixelplex.io/ws", true)
    .init_promise.then((res) => {
        ChainStore.init().then(() => {
            var fromAccount = "nathan";
            FetchChain("getAccount", fromAccount).then((account) => {
                console.log(EthAddress.fromId(account.get("id")));
            });
        });
    });
