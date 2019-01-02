

.PHONY:	compile gencft build clean destroy

gencft: compile
	-rm -rf ./cft
	mkdir -p ./cft
	cdk synth HelloCdkStack >./cft/stack.yaml

compile:
	npm run build

build: compile
	cdk deploy

clean:
	-rm -rf ./cft
	-rm ./bin/*.d.ts
	-rm ./bin/*.js
	-rm ./lib/*.d.ts
	-rm ./lib/*.js

destroy:
	cdk destroy
