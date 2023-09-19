#include 'protheus.ch'

User Function XCLIPOUI()
    FwCallApp("customers-poui")
Return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
    Do Case
        Case cType == "preLoad"
        Case cType == "jstoadvplPar1"

            GetJson(@oWebChannel)
    EndCase
Return

Static Function GetJson(oWebChannel)
  Local jJson as Json

  jJson := JsonObject():New()

  jJson["message"] := "Hello World"

  oWebChannel:AdvplToJs("receiveId1", jJson:toJson())

Return
