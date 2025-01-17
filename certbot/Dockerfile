# Certbot 공식 이미지를 기반으로 사용
FROM certbot/certbot:v2.8.0

# Certbot에 필요한 추가 패키지나 설정을 추가할 수 있습니다.
# 예를 들어, cron을 설치하여 주기적인 인증서 갱신을 처리하려면 cron을 추가할 수 있습니다.
RUN apt-get update && apt-get install -y cron

# 인증서 발급 및 갱신을 위한 entrypoint 설정
# 인증서 갱신 작업을 주기적으로 실행하도록 설정
# ENTRYPOINT ["/bin/sh", "-c", "trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;"]

# 만약 초기 인증서 발급을 위해 직접 명령을 실행하고 싶다면
# 아래와 같이 명령을 변경할 수 있습니다.
ENTRYPOINT ["certbot", "certonly", "--webroot", "-w", "/var/www/certbot", "-d", "willki.dev", "-d", "www.willki.dev"]

# 로그 및 인증서 정보를 저장할 디렉토리 마운트
VOLUME ["/etc/letsencrypt", "/var/www/certbot"]

# certbot 갱신이 실행될 때 로그를 기록할 디렉토리
WORKDIR /etc/letsencrypt

# certbot 로그와 인증서 정보를 볼륨으로 마운트할 때 사용하는 디렉토리
VOLUME ["/etc/letsencrypt", "/var/www/certbot"]

# 기본적으로 certbot이 실행되는 웹 루트 디렉토리 설정
RUN mkdir -p /var/www/certbot

# certbot renew 명령을 주기적으로 실행하려면 cron을 설정하여 12시간마다 갱신
COPY ./certbot-renew-cron /etc/cron.d/certbot-renew
RUN chmod 0644 /etc/cron.d/certbot-renew
RUN crontab /etc/cron.d/certbot-renew

# 80번 포트와 443번 포트를 공개
EXPOSE 80
EXPOSE 443