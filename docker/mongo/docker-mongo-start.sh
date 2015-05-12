docker run -it --link mongo:origami-polyglot/mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONO_PORT_27017_TCP_PORT/test"'

