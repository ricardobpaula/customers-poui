#include 'protheus.ch'

User Function XCLIPOUI()
    FwCallApp("customers-poui")
Return

Static Function JsToAdvpl(oWebChannel,cType,cContent)
    Do Case
        Case cType == "preLoad"
        Case cType == "sendGetCustomers"
            GetCustomers(@oWebChannel)
    EndCase
Return

Static Function GetCustomers(oWebChannel)
  Local jJson as Json
  Local jLine as Json
  Local aArea := FwGetArea() as Array

  jJson := JsonObject():New()

  jJson["data"] := {}

  DbSelectArea("SA1")
  SA1->(DbGoTop())

  While(!SA1->(EOF()))
    jLine := JsonObject():New()
    jLine["code"] := SA1->A1_COD
    jLine["name"] := SA1->A1_NOME

    aadd(jJson["data"],jLine)

    SA1->(DbSkip())
  Enddo

  oWebChannel:AdvplToJs("receiveGetCustomers", jJson:toJson())

  SA1->(DbCloseArea())

  FwRestArea(aArea)

Return
