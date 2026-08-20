import click

@click.command()
def work():
    print("worker is working on backside")

commands = [work]