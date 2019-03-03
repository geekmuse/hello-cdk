ENV ?= dev
default_target: help
.PHONY:	help compile gencft build clean destroy

help:				## This help.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

gencft: compile			## Generates a CloudFormation template in local "cft" directory.
	-mkdir -p "./cft/$(ENV)"
	cdk synth -c ENV=$(ENV) "HelloCdkBase-$(ENV)" >./cft/$(ENV)/base.yaml

compile:			## Runs TypeScript to generate *.js files.
	@echo "Building for ENV: $(ENV)"
	npm run build

build: compile			## Runs "compile" target + deploys CloudFormation stack.
	cdk deploy -c ENV=$(ENV)

clean:				## Cleans up "compile" and "gencft" target artifacts.
	-rm -rf ./cft
	-rm ./bin/*.d.ts
	-rm ./bin/*.js
	-rm ./lib/*.d.ts
	-rm ./lib/*.js

destroy:			## Destroys CloudFormation stack.  **WARNING: DESTRUCTIVE**
	cdk destroy -c ENV=$(ENV)
