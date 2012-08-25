express = require("express")
http = require("http")
path = require("path")

app = express()
app.configure ->
  app.set "port", process.env.PORT or 5000
  app.set "views", __dirname + "/views"
  app.set "view engine", "jade"
  app.use express.favicon()
  app.use express.logger("dev")
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use express.static(path.join(__dirname, "/client/public"))

app.configure "development", ->
  app.use express.errorHandler()

app.get "/", (req, res) ->
  res.render "index",
    title: "Piotr Yordanov"
app.get "/music", (req, res) ->
  res.render "music",
    title: "Piotr Yordanov"

http.createServer(app).listen app.get("port"), ->
  console.log "Express server listening on port " + app.get("port")
