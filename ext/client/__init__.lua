local readme = require("readme.lua")

Events:Subscribe(
    "Player:Connected",
    function(player)
        if player.id == PlayerManager:GetLocalPlayer().id then
            WebUI:Init()
            WebUI:ExecuteJS(
                'document.dispatchEvent(new CustomEvent("serverdiscription:UI:markdown",{detail:' ..
                    json.encode(readme) .. "}))"
            )
            WebUI:Show()
        end
    end
)

Hooks:Install(
    "UI:PushScreen",
    1,
    function(hook, screen, priority, parentGraph, stateNodeGuid)
        local screen = UIGraphAsset(screen)
        if screen.name == "UI/Flow/Screen/EORWinningTeamScreen" then
            WebUI:Hide()
        end

        if screen.name == "UI/Flow/Screen/SpawnScreenPC" then
            WebUI:Show()
        end
    end
)

Events:Subscribe('Player:Respawn', function(player)
    if player.id == PlayerManager:GetLocalPlayer().id then
        WebUI:Hide()
    end
end)