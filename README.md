# [3perf.com](http://3perf.com)

This is the source code for [3perf.com](http://3perf.com), a site of PerfPerfPerf, a performance consulting agency.

## How to run website locally

1. First, clone the repository using the following command. Don't forget to use `--recurse-submodules` flag.
   ```shell
   git clone --recurse-submodules git@github.com:3perf/website.git
   ```
1. Then go to the newly created folder, containing the cloned repository.
   ```shell
   cd website
   ```
1. After that install node modules using yarn.
   ```shell
   yarn
   ```
2. Finally run a local development server.
   ```shell
   yarn develop
   ```
